"use client";

import {
	Check,
	CheckSquare,
	ChevronDown,
	ChevronUp,
	PartyPopper,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { useApp } from "@/lib/context";
import { Task } from "@/lib/types";
import { cn, formatDate, isDueToday, isOverdue } from "@/lib/utils";

const MAX_COLLAPSED = 3;

export function TasksSection() {
	const { tasks, toggleTask, openBottomSheet } = useApp();
	const [expanded, setExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const { priorityTasks, otherTasks, completedTasks, allCompleted } =
		useMemo(() => {
			const active = tasks
				.filter((t) => !t.completed)
				.sort((a, b) => {
					const aOverdue = isOverdue(a.dueDate);
					const bOverdue = isOverdue(b.dueDate);
					if (aOverdue && !bOverdue) return -1;
					if (!aOverdue && bOverdue) return 1;
					return a.dueDate.getTime() - b.dueDate.getTime();
				});
			// Priority = overdue or due today, max 3
			const priority = active
				.filter((t) => isOverdue(t.dueDate) || isDueToday(t.dueDate))
				.slice(0, MAX_COLLAPSED);
			// The rest (future tasks + overflow priority)
			const other = active.filter((t) => !priority.includes(t));
			const completed = tasks.filter((t) => t.completed);
			return {
				priorityTasks: priority,
				otherTasks: other,
				completedTasks: completed,
				allCompleted: active.length === 0 && completed.length > 0,
			};
		}, [tasks]);

	const handleToggle = useCallback(
		(id: string) => {
			toggleTask(id);
		},
		[toggleTask],
	);

	// All-completed celebration state
	if (allCompleted) {
		return (
			<section>
				<div className="bg-white rounded-2xl p-5 shadow-sm text-center">
					<div className="flex justify-center mb-2">
					<div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EFF6FF' }}>
						<PartyPopper className="w-5 h-5" style={{ color: '#496BE3' }} />
						</div>
					</div>
					<p className="text-sm text-gray-700 font-medium">
						¡Cumpliste todas las tareas del día! 🎉
					</p>
				</div>
			</section>
		);
	}

	// Build subtitle line for header when collapsed
	const totalActive = priorityTasks.length + otherTasks.length;
	const overdueCount = [...priorityTasks, ...otherTasks].filter((t) =>
		isOverdue(t.dueDate),
	).length;
	let subtitleText = "";
	if (overdueCount > 0) {
		subtitleText = `${overdueCount} vencida${overdueCount > 1 ? "s" : ""} · ${totalActive} total`;
	} else {
		subtitleText = `${totalActive} pendiente${totalActive !== 1 ? "s" : ""}`;
	}

	return (
		<section>
			<div
				ref={containerRef}
				className="bg-white rounded-2xl shadow-sm overflow-hidden"
			>
				{/* Header — always visible */}
				<div className="flex items-center justify-between px-3 py-3">
					<button
						className="flex items-center gap-3 flex-1 min-w-0"
						onClick={() => setExpanded((v) => !v)}
					>
						<div
							className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
						style={{ background: "#EFF6FF" }}
					>
						<CheckSquare className="w-4 h-4" style={{ color: "#496BE3" }} />
						</div>
						<div className="flex-1 min-w-0 text-left">
							<p className="text-sm font-semibold text-gray-800">
								Mis tareas
							</p>
							{!expanded && (
								<p className="text-xs text-gray-400 mt-0.5">{subtitleText}</p>
							)}
						</div>
					{expanded ? (
						<ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
					) : (
						<ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
					)}
					</button>
				</div>

				{/* All tasks — only visible when expanded */}
				{expanded && (
					<div className="border-t border-gray-50 divide-y divide-gray-50">
						{[...priorityTasks, ...otherTasks].map((task, index) => (
							<TaskRow
								key={task.id}
								task={task}
								index={index}
								onToggle={() => handleToggle(task.id)}
							/>
						))}
						{completedTasks.map((task, index) => (
							<TaskRow
								key={task.id}
								task={task}
								index={priorityTasks.length + otherTasks.length + index}
								onToggle={() => toggleTask(task.id)}
								completed
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

function TaskRow({
	task,
	index,
	onToggle,
	completed,
}: {
	task: Task;
	index: number;
	onToggle: () => void;
	completed?: boolean;
}) {
	const overdue = !completed && isOverdue(task.dueDate);
	const dueToday = !completed && isDueToday(task.dueDate);
	const [swipeX, setSwipeX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const startXRef = useRef(0);
	const rowRef = useRef<HTMLDivElement>(null);

	const getDueBadge = useCallback(() => {
		if (completed && task.completedDate) {
			return {
				text: `${formatDate(task.completedDate, "d MMM")}`,
				className: "bg-gray-100 text-gray-400",
			};
		}
		if (overdue)
			return { text: "Vencida", className: "bg-red-50 text-red-600" };
		if (dueToday)
			return { text: "Hoy", className: "bg-orange-50 text-orange-600" };
		return {
			text: formatDate(task.dueDate, "d MMM"),
			className: "bg-gray-100 text-gray-500",
		};
	}, [completed, task.completedDate, task.dueDate, overdue, dueToday]);

	const badge = getDueBadge();

	const handleTouchStart = (e: React.TouchEvent) => {
		startXRef.current = e.touches[0].clientX;
		setIsDragging(true);
	};
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		const diff = e.touches[0].clientX - startXRef.current;
		setSwipeX(Math.max(0, Math.min(80, diff)));
	};
	const handleTouchEnd = () => {
		if (swipeX > 60) onToggle();
		setSwipeX(0);
		setIsDragging(false);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		startXRef.current = e.clientX;
		setIsDragging(true);
		const handleMouseMove = (e: MouseEvent) => {
			setSwipeX(Math.max(0, Math.min(80, e.clientX - startXRef.current)));
		};
		const handleMouseUp = () => {
			if (swipeX > 60) onToggle();
			setSwipeX(0);
			setIsDragging(false);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const creatorName = task.createdByMe
		? "Creada por mí"
		: task.assignedBy
			? task.assignedBy.name
			: "Sistema";
	const creatorAvatar = task.createdByMe
		? "YO"
		: task.assignedBy?.avatar || "SY";

	return (
		<div
			ref={rowRef}
			data-task-index={index}
			className="relative overflow-hidden"
		>
			{/* Swipe-to-complete background */}
			<div
				className="absolute inset-y-0 left-0 flex items-center pl-4 transition-opacity"
				style={{
					backgroundColor: "#496BE3",
					width: "80px",
					opacity: swipeX > 0 ? 1 : 0,
				}}
			>
				<Check className="w-5 h-5 text-white" />
			</div>

			<div
				className={cn(
					"flex items-start gap-3 p-3 bg-white relative select-none",
					completed && "opacity-50",
					false,
					!isDragging && "transition-transform duration-200",
				)}
				style={{ transform: `translateX(${swipeX}px)` }}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
			>
				<button
					onClick={(e) => {
						e.stopPropagation();
						onToggle();
					}}
					className={cn(
						"w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors",
						completed
							? "border-[#496BE3] bg-[#496BE3]"
							: "border-gray-300 hover:border-[#496BE3]",
					)}
				>
					{completed && <Check className="w-3 h-3 text-white" />}
				</button>

				<div className="flex-1 min-w-0">
					<p
						className={cn(
							"text-sm font-medium text-gray-800",
							completed && "line-through",
						)}
					>
						{task.title}
					</p>
					<div className="flex items-center gap-1.5 mt-1">
						<Avatar name={creatorName} initials={creatorAvatar} size="xs" />
						<span className="text-xs text-gray-400">{creatorName}</span>
					</div>
				</div>

				<span
					className={cn(
						"text-xs px-2 py-0.5 rounded-full shrink-0 font-medium",
						badge.className,
					)}
				>
					{badge.text}
				</span>
			</div>
		</div>
	);
}
