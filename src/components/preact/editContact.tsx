import { useState, useEffect } from "preact/hooks";

const EditContact = ({ data }: any) => {
    const [name, setName] = useState<string>("");
    const [date_of_birth, setDOB] = useState<string>("");
    const [workplace, setWorkplace] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

  const setContact = async () => {
    try {

      const contactData = await fetch(`/api/contacts/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contact = await contactData.json();

      setName(contact.name);
      setDOB(contact?.date_of_birth);
      setWorkplace(contact?.workplace);
      setPhone(contact?.phone);
      setEmail(contact?.email);
      setNotes(contact?.notes);
      setThumbnail(contact?.thumbnail);
    } catch (error) {
      console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    setContact();
  }, []);

  const changeContact = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/contacts/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            date_of_birth,
            workplace,
            phone,
            email,
            notes,
            thumbnail
        })
      });
      
      window.location.replace(`/people/${data}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (e: Event) => {
    e.preventDefault();

    try {
      await fetch(`/api/contacts/${data}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.replace("/people");
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
                <h2 class="subtitle">Edit Contact</h2>
            </div>
        </div>
        <div class="card-content">
          <form onSubmit={changeContact}>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Workplace</label>
              <div class="control">
                <input
                  value={workplace}
                  onChange={(e) => setWorkplace(e.currentTarget.value)}
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Phone</label>
              <div class="control">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Notes</label>
              <div class="control">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                  class="textarea has-fixed-size"
                  rows={10}
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Thumbnail</label>
              <div class="control">
                <input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.currentTarget.value)}
                  class="input"
                  type="url"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">
                  Update
                </button>
                <button class="button is-danger ml-4" onClick={deleteContact}>
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

export { EditContact };