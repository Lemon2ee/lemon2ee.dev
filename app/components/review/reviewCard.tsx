function ReviewCard({ slug, name }: { slug: string; name: string }) {
    return (
        <div className="group">
            <a
                href={`/blog/${slug}`}
                className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
            >
                <div className="flex flex-col">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {name}
                    </p>
                </div>
                <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
                    r
                </div>
            </a>
        </div>
    );
}