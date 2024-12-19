import ListingsClient from "@/components/ListingsClient";

const Listings = ({ initialProducts }) => {
  return <ListingsClient initialProducts={initialProducts} />;
};

export async function getServerSideProps() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=12&skip=0");
    const data = await response.json();

    return {
      props: {
        initialProducts: data.products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products on the server:", error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
}

export default Listings;


