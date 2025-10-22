import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}


const Sidebar = () => {

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    // keyword,
    setKeyword,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  //   useeffect
  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );

        setCategories(uniqueCategories);
        console.log(data);
      } catch (error) {
        console.error("Error fetching");
      }
    };

    fetchcategories();
  }, []);

  const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=> {

    const value = e.target.value;
    setMinPrice(value ? parseFloat(value):undefined)
  }
  
  const handleMaxPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=> {

    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value):undefined)

  }
  const handleRadioChangeCategories = (category:string)=>{
    setSelectedCategory(category)
  }
  const handleKeywordClick =(keyword:string)=>{
    setKeyword(keyword);
  }
  const handleResetFilters = ()=>{
    
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  }

  return (
    <div className="w-64 h-screen p-5">
      <h1 className="text-2xl font-bold mb-10 mt-4">MahmudHome</h1>
      {/* section */}
      <section>
        <input
          type="text"
          className="border-2 rounder px-2 sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}

          />
          <input
            type="text"
            className="border-2 mr-2 px-5 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>
      {/* Categories Section */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
      </div>
     <section>
      {categories.map((category,index)=>(
        <label  key={index } className="block mb-2">

            <input 
            type="radio"
            name="category"
            value={category}
            onChange={()=> handleRadioChangeCategories(category)}
            className="mr-2 w-[16px] h-[16px]" 
            checked={selectedCategory === category}
            />

            {category.toUpperCase()}

        </label>

      ))}
      </section>

      {/* keyword */}
      <section>

        <div className="mb-5 mt-4">
            <h2 className="text-xl font-semibold mb-3">
                KeyWords
            </h2>

            {keywords.map((keyword,index)=>(
                <button key={index} onClick={()=>handleKeywordClick(keyword)} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200">
                    {keyword.toUpperCase()}
                </button>
            ))}


        </div>


      </section>

      <section>

        <button onClick={handleResetFilters} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">Reset</button>


      </section>



    </div>
  );
};

export default Sidebar;
