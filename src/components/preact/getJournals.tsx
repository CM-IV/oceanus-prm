import { useEffect, useState } from "preact/hooks";

const GetJournals = () => {
    const [journalData, setJournalData] = useState<Journal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const fetchJournals = async () => {
        try {
            const res = await fetch(`/api/journals`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            });

            const filteredJournals = await res.json();

            setJournalData(filteredJournals);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchJournals();
    }, [])

    return (
        <>
            {!isLoading ? (
                <>
                    <div class="columns is-centered">
                        <div class="column">
                            <a class="button mb-6 mt-2" href="/journal/add">Add Journal Entry</a>
                        </div>
                    </div>
                    {journalData.map((s: Journal) => {
                        return (
                            <div class="box">
                                <a href={`/journal/${s.id}/edit`}>
                                    <article class="media">
                                        <figure class="media-left">
                                            <span class="tag is-info is-normal mt-2">{s.date}</span>
                                        </figure>
                                        <div class="media-content">
                                            <div class="content">
                                                <p class="has-text-black"><strong>{s.title}</strong>
                                                <br />
                                                {s.entry}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </a>
                            </div>
                        )
                    })}
                </>
            ) : (
                <img src="/svg/loading.svg" alt="loading" width={200} />
            )}
            {!isLoading && journalData.length == 0 && (
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-half">
                            <img id="greet-img" src="/svg/photographer.svg" alt="photographer image" width={200} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export { GetJournals };