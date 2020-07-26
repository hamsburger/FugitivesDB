import React from 'react';
import TitlePage from "./homeComponents/Title.js";
import CardLayout from "./homeComponents/CardLayout.js";
// import logo from './logo.svg'; this is how you import images 

function Home() {
  return (
    <div>
        <TitlePage></TitlePage>
        <CardLayout></CardLayout>
    </div>
  );
}

export default Home;
