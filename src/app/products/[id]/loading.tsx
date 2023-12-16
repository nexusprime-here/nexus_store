import { Skeleton } from "@components/structure/Skeleton";

function Loading() {
	return (
		<>
			<Skeleton className="h-60 w-full rounded" />

			<div className="mx-8 mt-5 flex items-center justify-between">
				<Skeleton className="h-11 w-44" />
				<Skeleton className="ml-2 h-8 w-24" />
			</div>

			<Skeleton className="mx-7 my-5 max-h-40 min-h-[5rem] w-[calc(100%-3.5rem)]" />

			<div className="flex w-full justify-around">
				<div className="flex flex-row items-center">
					<Skeleton className="h-7 w-7" />
					<div className="mx-3">
						<Skeleton className="h-5 w-[10px] rounded-sm" />
					</div>
					<Skeleton className="h-7 w-7" />
				</div>

				<Skeleton className="h-10 w-40" />
			</div>
		</>
	);
}

export default Loading;
