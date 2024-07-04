import ItemList from "./ItemList";

const Content = ({ items, handaleDelete, handleCheck}) => {
  return (
    <>
      {items.length ? (
        <ItemList items={items} handleDelete={handaleDelete} handleCheck={handleCheck}/>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
