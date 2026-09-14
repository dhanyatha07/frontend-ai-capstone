import { useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let newIndex = index;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    }

    if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Example tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${tab.id}-tab`}
            aria-selected={activeTab === index}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tabs[activeTab].id}-panel`}
        aria-labelledby={`${tabs[activeTab].id}-tab`}
        tabIndex={0}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
