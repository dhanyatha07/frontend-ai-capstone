import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";
import { useRef, useState } from "react";
function Playground() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <h1>Accessible Components Playground</h1>

      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          openButtonRef.current?.focus();
        }}
        title="Example Modal"
      >
        <p>This is our accessible modal.</p>
        <button type="button">Example Action</button>
      </Modal>

      <Tabs
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: <p>This is the overview tab.</p>,
          },
          {
            id: "details",
            label: "Details",
            content: <p>These are the details.</p>,
          },
          {
            id: "settings",
            label: "Settings",
            content: <p>These are the settings.</p>,
          },
        ]}
      />
      <Disclosure title="More Information">
        <p>This content can be expanded and collapsed.</p>
      </Disclosure>
    </div>
  );
}

export default Playground;
