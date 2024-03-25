import React from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import './root.css'
import { projects } from "../../main";

export default function Root() {
  const { projects, query, setQuery } = useProjects();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <div id="sidebar">
        <h1>Projects</h1>
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
            { projects.map(p =>
              <li key={p.path}>
                <NavLink to={p.path}>{p.name}</NavLink>
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

function useProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const searchResults = React.useMemo(() => {
    if (!query.length) return projects;

    return projects.filter(p => p.name.toLowerCase().includes(query));
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
  return { projects: searchResults, query, setQuery };
}