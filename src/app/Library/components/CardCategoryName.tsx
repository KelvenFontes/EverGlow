
interface CardCategoryNameProps {
  category: SpotifyCategoryItem
}

const CardCategoryName = ({ category }: CardCategoryNameProps) => {

  // useEffect(() => {


  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <p className="text-white">{category.name}</p>
    </div>
  );
}

export default CardCategoryName;
