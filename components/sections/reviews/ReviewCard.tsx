import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarRatingDisplay } from "./StarRatingDisplay";

export function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="min-w-[340px] max-w-xs w-full flex-shrink-0 h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(review.time).toLocaleDateString()}
            </p>
          </div>
          <StarRatingDisplay rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
