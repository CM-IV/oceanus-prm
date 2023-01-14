import { useState } from "preact/hooks";

const AddContacts = () => {
    const [name, setName] = useState<string>("");
    const [date_of_birth, setDOB] = useState<string>("");
    const [workplace, setWorkplace] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");

    const makeContact = async (e: Event) => {
        e.preventDefault();

        try {
            await fetch("/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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

            window.location.replace("/people");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div class="columns is-centered">
            <div className="column is-three-quarters">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <h2 class="subtitle">Add a Contact</h2>
                        </div>
                    </div>
                    <div class="card-content">
                        <form onSubmit={makeContact}>
                            <div class="field">
                            <label class="label">Name</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    class="input"
                                    type="text"
                                    defaultValue={""}
                                    required
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Date of Birth</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setDOB(e.currentTarget.value)}
                                    class="input"
                                    type="text"
                                    defaultValue={""}
                                    
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Workplace</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setWorkplace(e.currentTarget.value)}
                                    class="input"
                                    type="text"
                                    defaultValue={""}
                                    
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Phone Number</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setPhone(e.currentTarget.value)}
                                    class="input"
                                    type="tel"
                                    defaultValue={""}
                                    
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Email</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    class="input"
                                    type="email"
                                    defaultValue={""}
                                    
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Notes</label>
                                <div class="control">
                                    <textarea
                                     class="textarea has-fixed-size"
                                     defaultValue={""}
                                     onChange={(e) => setNotes(e.currentTarget.value)}
                                     rows={10}
                                    ></textarea>
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Thumbnail</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setThumbnail(e.currentTarget.value)}
                                    class="input"
                                    type="url"
                                    defaultValue={""}

                                    />
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-link" type="submit">
                                    Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AddContacts };