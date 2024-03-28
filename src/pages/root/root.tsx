import React from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import './root.css';
import { useLocalStorage } from "usehooks-ts";
import { pages as dbPages } from 'src/db.json'

export default function Root() {
  const { isOpen, toggleSidebar } = useSidebarState();
  const { pages, query, setQuery } = usePages();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <div id="sidebar" className={isOpen ? "open" : "closed"}>
        <div className="tab">
          <button onClick={toggleSidebar} className={isOpen ? "open" : "closed"}><div className="tabText">{"<"}</div></button>
        </div>
        
        <h1>Project Pages</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search projects"
              placeholder="Search"
              type="search"
              name="query"
              value={query}
              onChange={handleChange}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
        </div>
        <nav>
          <ul>
            {pages.map(p =>
              <li key={p.id}>
                <NavLink to={`/${p.id}`}>{p.name}</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

function usePages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const searchResults = React.useMemo(() => {
    if (!query.length) return dbPages;

    return dbPages.filter(p => p.name.toLowerCase().includes(query));
  }, [query]);

  const setQuery = (query: string) => {
    // If the new query is blank, start a new history entry.  Otherwise we'll replace the current history entry.
    const replace = !!query?.length;
    setSearchParams(prev => {
      const queryString = prev.toString();
      const updatedParams = new URLSearchParams(queryString);

      if (query.length) {
        updatedParams.set('query', query);
      } else {
        updatedParams.delete('query');
      }

      return updatedParams;
    }, { replace });
  }

  return { pages: searchResults, query, setQuery };
}

function useSidebarState() {
  const [isOpen, setIsOpen] = useLocalStorage("sidebar", true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  return { isOpen, toggleSidebar };
}