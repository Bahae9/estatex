import { cn } from "@/lib/utils";
import { FeedbackProps } from "@/types/db";
import Stars from "../../feedback/_components/stars";

const Testimonials = ({
  feedbacks,
}: {
  feedbacks: (FeedbackProps & { fullName: string })[];
}) => {
  return (
    <section className="py-20 max-w-6xl mx-auto flex flex-col">
      <div className="px-6 md:px-8 flex flex-col justify-center items-center gap-16 flex-1">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">Testimonials</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Discover what our clients say about us. We are proud to share their
            experiences and positive reviews of our professional and
            personalized service. Your satisfaction is our priority.
          </p>
        </div>
        {feedbacks.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-${
              feedbacks.length - 1
            } md:grid-cols-${feedbacks.length} lg:grid-cols-${
              feedbacks.length - 1
            } xl:grid-cols-${feedbacks.length} gap-12`}
          >
            {feedbacks.map((el, index) => (
              <Testimonail
                key={el.id}
                {...el}
                isLast={index === feedbacks.length - 1}
              />
            ))}
          </div>
        ) : (
          <p>
            No feedbacks are currently available. Feedbacks will display here
            once added.
          </p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

function Testimonail({
  feedback,
  fullName,
  rate,
  isLast,
}: (FeedbackProps & { fullName: string }) & { isLast: boolean }) {
  return (
    <figure
      className={cn(
        isLast && "sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1"
      )}
    >
      <svg
        className="h-12 mx-auto mb-3 text-foreground/60"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="text-center">
        <p className="line-clamp-3" title={feedback}>
          {feedback}
        </p>
      </blockquote>
      <figcaption className="flex items-center justify-center mt-4 space-x-3">
        <div className="flex gap-4 items-center">
          <p>{fullName}</p>
          <Stars rate={rate} />
        </div>
      </figcaption>
    </figure>
  );
}
