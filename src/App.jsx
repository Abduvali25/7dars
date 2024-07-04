import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Content from "./components/Content";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    console.log(items);
    const api_url = "http://localhost:3000";
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error was not ok: ${errorText}`);

        }

        const newItems = await response.json();
        setItems(newItems)
      } catch (error) {
        console.log("Error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchItems()
    }, 2000)
  }, [])

  async function addItem() {
    const id = Date.now();

    const item = {
      id,
      item: newItem,
      checked: false,
    };

    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(item)
      })

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok:${errorText}`)
      }
      const newItems = [...items, newItem];
      setItems(newItems)
     
    } catch (error) {
      console.error("Error creating new item", error.message)
    }
  }

  async function handaleDelete(id) {
    try {
      const deletedItem = items.find((item) => item.id === id);
      if(!deletedItem) throw new Error("Deleted item not found");

      const response = await fetch(`$api_url}/items/${id}`, {
        method: "DELETE",
      });
      if(!response.ok) {
        const errorText = await response.text();
        throw new Error(`"Response was not ok:" ${errorText}`);
      }

      const filterItems = items.filter((item) => item.id !== id);
      setItems(filteredItem)
    } catch (error) {
      console.error("Error deleting item", error.message);
      setFetchError(error.message)
    }
  }

  async function handaleCheck(){
     try {
      const updatedItem = items.find((item) => item.id === id);
      if(!updatedItem) throw new Error("Updated item not found");
      const response = await fetch(`$api_url}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
          },
          body: JSON.stringify({checked: !updatedItem.checked}),
          });
          if(!response.ok) {
            const errorText = await response.text();
            throw new Error(`"Response was not ok:" ${errorText}`);
          }

          const updatedItems = items.map((item) => 
          item.id === id ? { ...item, checked: !item.checked } : item
          );
          setItems(updatedItems)
     } catch (error) {
      console.error("Error updating item", error.message);
      setFetchError(error.message)
     }
  }

  function handaleSubmit(e) {
    e.preventDefault();
    addItem();
  }

  return (
    <div className='App'>
      <Header title='Grocery List' />
      <AddItem newItem={newItem} onNewItem={setNewItem} handaleSubmit={handaleSubmit} />
      <SearchItem search={search} onSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && <Content items={items.filter
          ((item) => item.item.toLowerCase().includes(search.toLowerCase()))} />}
         <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
          
          />
      </main>
      <Footer />
    </div>
  );
}

export default App;
