import React from "react";
import "./tabsInterface.css"

export default function Tabs() {
  const { selected, all, selectTab } = useLanguages();

  return (
    <div className="tabs">
      <div className="tabList">
        {all.map(language => <button key={language.id} className={selected.id == language.id ? "tab active" : "tab"} onClick={() => selectTab(language.id)}>{language.name}</button> )}
      </div>
      <div className="tabContent">
        <selected.component description={selected.description} />
      </div>
    </div>
  );
}

function PageContent({ description }: { description: string }) {
  return (
    <p>{description}</p>
  );
}

const languagePages = [
  {
    id: 0,
    name: "HTML",
    description: `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.`,
    component: PageContent
  },
  {
    id: 1,
    name: "CSS",
    description: `Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.`,
    component: PageContent
  },
  {
    id: 2,
    name: "JavaScript",
    description: `JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.`,
    component: PageContent
  },
]

function useLanguages() {
  const [activeTab, setActiveTab] = React.useState(() => languagePages[0].id);

  // TODO: memoize selectTab and account for errors (id does not exist).
  return { selected: languagePages[activeTab], all: languagePages, selectTab: (id: number) => setActiveTab(id) }
}