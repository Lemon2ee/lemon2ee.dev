import Image from "next/image";

export function ReviewCard({
  title,
  content,
  imageUrl,
  rating,
  bar_bg_color,
  bar_color,
}: {
  title: string;
  content: string;
  imageUrl: string;
  rating: number;
  bar_bg_color: string;
  bar_color: string;
}) {
  // Round the rating to one decimal place
  const roundedRating = Math.round(rating * 10) / 10;
  // Calculate the width percentage
  const widthPercentage = `${rating * 10}%`;

  return (
    <div className="max-w-2xl border-neutral-700 bg-neutral-800 rounded-xl shadow-md overflow-hidden my-5">
      <div>
        <div>
          <Image
            className="h-52 w-full object-cover"
            src={imageUrl}
            height={620}
            width={1920}
            alt={title}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-8">
          <div className={`uppercase tracking-wide text-xl font-semibold`}>
            {title}
          </div>
          <div className="row-span-1 flex items-center w-3/5 py-4">
            <span className="text-sm font-medium text-gray-400">
              {roundedRating}
            </span>
            <div
              className={`w-full rounded h-2.5 ms-2`}
              style={{ backgroundColor: bar_bg_color }}
            >
              <div
                className={`h-2.5 rounded`}
                style={{ width: widthPercentage, backgroundColor: bar_color }}
              ></div>
            </div>
          </div>
          <p
            className="text-neutral-100"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
      </div>
    </div>
  );
}
