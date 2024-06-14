import Github from "@/assets/Github";
import Globe from "@/assets/Globe";
import Checkbox from "./ui/Checkbox";
import { actions } from "astro:actions";
import toast from "react-hot-toast";
import { useState } from "react";

type TReview = {
  name: string;
  id: number;
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
  isReviewed: boolean;
};

type Props = {
  item: TReview;
};

const ReviewRow = ({ item }: Props) => {
  const [localIsReviewed, setLocalIsReviewed] = useState(item.isReviewed);
  const [localIsFeatured, setLocalIsFeatured] = useState(item.featured);

  return (
    <div className="grid gap-1 py-2 grid-cols-5 mx-auto w-screen max-w-2xl">
      <p className="grid place-items-center text-center">{item.name}</p>
      <p>
        <a
          href={item.demoUrl}
          title={item.demoUrl}
          className="grid place-items-center"
        >
          <Globe />
        </a>
      </p>
      <a
        href={item.repoUrl}
        title={item.repoUrl}
        className="grid place-items-center"
      >
        <Github />
      </a>
      <Checkbox
        checked={localIsFeatured}
        label="Toggle Featured"
        onChangeHandler={async () => {
          const { error } = await actions.feature.safe({ id: item.id });

          if (error) {
            return toast.error(error.message);
          }

          setLocalIsFeatured(!localIsFeatured);
          toast.success("Featured status changed");
        }}
      />

      <Checkbox
        checked={localIsReviewed}
        label="Toggle Review"
        onChangeHandler={async () => {
          const { error } = await actions.review.safe({ id: item.id });

          if (error) {
            return toast.error(error.message);
          }

          setLocalIsReviewed(!localIsReviewed);
          toast.success("Review status changed");
        }}
      />
    </div>
  );
};
export default ReviewRow;
