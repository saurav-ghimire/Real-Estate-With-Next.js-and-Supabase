import Header from "./_components/Header";


function Provider({children}) {
  return ( 
    <div>
      <Header />
        <div className='px-4 md:px-20'>
          {children }
        </div>
    </div>
  );
}

export default Provider;