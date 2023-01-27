import { useState } from "preact/hooks";

const AddJournals = () => {
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [entry, setEntry] = useState<string>("");

    const makeEntry = async (e: Event) => {
        e.preventDefault();

        try {
            await fetch("/api/journals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    date: new Date().toLocaleDateString(),
                    entry
                })
            });

            window.location.replace("/journal");
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
                            <h2 class="subtitle">Add a Journal Entry</h2>
                        </div>
                    </div>
                    <div class="card-content">
                        <form onSubmit={makeEntry}>
                            <div class="field">
                            <label class="label">Title (optional)</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                    class="input"
                                    type="text"
                                    required
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Date</label>
                                <div class="control">
                                    <input
                                    onChange={(e) => setDate(e.currentTarget.value)}
                                    value={new Date().toLocaleDateString()}
                                    class="input"
                                    readOnly
                                    />
                                </div>
                            </div>
                            <div class="field">
                            <label class="label">Entry</label>
                                <div class="control">
                                    <textarea
                                     class="textarea has-fixed-size"
                                     onChange={(e) => setEntry(e.currentTarget.value)}
                                     rows={10}
                                    ></textarea>
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

export { AddJournals };