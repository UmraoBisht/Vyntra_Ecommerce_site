import React from "react";
import Navbar from "../components/Navbar";
import CategoryFilters from "../components/CategoryFilters";

function Home() {
  return (
    <>
     <Navbar>
        <CategoryFilters/>
      </Navbar>
    </>
  );
}

export default Home;
