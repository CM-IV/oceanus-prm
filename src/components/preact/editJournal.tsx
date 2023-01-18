import { useState, useEffect } from "preact/hooks";

const EditJournal = ({ data }: any) => {
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [entry, setEntry] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

  const setJournal = async () => {
    try {

      const journalData = await fetch(`/api/journals/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const journal = await journalData.json();

      setTitle(journal?.title);
      setDate(journal.date);
      setEntry(journal.entry);

    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    setJournal();
  }, []);

  const changeJournal = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/journals/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            date,
            entry
        })
      });
      
      window.location.replace(`/journal`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJournal = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/journals/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.replace("/journal");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div class="card">
        <div class="card-header">
            <div class="card-header-title">
                <h2 class="subtitle">Edit Journal Entry</h2>
            </div>
        </div>
        <div class="card-content">
          <form onSubmit={changeJournal}>
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Date</label>
              <div class="control">
                <input
                  value={date}
                  onChange={(e) => setDate(e.currentTarget.value)}
                  class="input"
                  type="date"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Entry</label>
              <div class="control">
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.currentTarget.value)}
                  class="textarea has-fixed-size"
                  rows={10}
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">
                  Update
                </button>
                <button class="button is-danger ml-4" onClick={deleteJournal}>
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      ) : (
        <svg version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
            <path fill="#ff0000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
                from="0 50 50"
                to="360 50 50" 
                repeatCount="indefinite" />
          </path>
        </svg>
      )}
    </>
  );
};

export { EditJournal };