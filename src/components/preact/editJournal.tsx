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
        <img src="/svg/loading.svg" alt="loading" width={200} />
      )}
    </>
  );
};

export { EditJournal };