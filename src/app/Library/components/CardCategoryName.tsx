import Link from "next/link";

interface CardCategoryNameProps {
  category: SpotifyCategoryItem
}

const CardCategoryName = ({ category }: CardCategoryNameProps) => {

  return (
    <div className="border rounded-full px-3 whitespace-nowrap">
      <Link href={'/'}>
        <p className="text-white font-medium">{category.name}</p>
      </Link>
    </div>
  );
}

export default CardCategoryName;
