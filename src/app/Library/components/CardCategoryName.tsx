interface CardCategoryNameProps {
  category: SpotifyCategoryItem
}

const CardCategoryName = ({ category }: CardCategoryNameProps) => {

  return (
    <div className="border rounded-full px-3 whitespace-nowrap">
      <p className="text-white font-medium">{category.name}</p>
    </div>
  );
}

export default CardCategoryName;
