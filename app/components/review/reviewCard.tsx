export function ReviewCard({
                             title,
                             content,
                             imageUrl,
                             rating,
                           }: {
  title: string;
  content: string;
  imageUrl: string;
  rating: number;
}) {
  // Round the rating to one decimal place
  const roundedRating = Math.round(rating * 10) / 10;
  // Calculate the width percentage
  const widthPercentage = `${rating * 10}%`;

  return (
      <div className="max-w-2xl mx-auto border-neutral-700 bg-neutral-800 rounded-xl shadow-md overflow-hidden">
        <div>
          <div>
            <img
                className="h-52 w-full object-cover"
                src={imageUrl}
                alt="Modern building architecture"
            />
          </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-xl text-indigo-500 font-semibold">
                    {title}
                </div>
                <div className="row-span-1 flex items-center w-3/5 py-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {roundedRating}
            </span>
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 ms-2">
                        <div
                            className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                            style={{width: widthPercentage}}
                        ></div>
                    </div>
                </div>
                <p className="text-neutral-100" dangerouslySetInnerHTML={{__html: content}}></p>
            </div>
        </div>
      </div>
  );
}
