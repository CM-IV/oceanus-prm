import { useEffect, useState } from "preact/hooks";
import Fuse from "fuse.js";

const GetContacts = ({ data }: any) => {
    const [contactData, setContactData] = useState<Contact[]>([]);
    const [searchData, setSearchData] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const fetchContacts = async () => {
        try {
            const allContacts = await fetch(`/api/contacts`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            });

            const contacts = await allContacts.json();

            const filteredContacts = contacts.filter((c: Contact) => c.user_id === data);

            setContactData(filteredContacts);
            setSearchData(filteredContacts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    const handleSearch = (query: string) => {
        if (!query) {
          setSearchData(contactData);
          return;
        }
    
        const options: Fuse.IFuseOptions<Contact> = {
          includeScore: true,
          keys: ["name"],
        };
    
        const fuse = new Fuse(contactData, options);
    
        const result = fuse.search(query);
        const finalResult: Contact[] = [];
    
        if (!result.length) {
          setSearchData(contactData);
        } else {
          result.forEach(({ item }) => {
            finalResult.push(item);
          });
          setSearchData(finalResult);
        }
      };

    return (
        <>
            {!isLoading ? (
                <>
                    <div class="columns is-centered">
                    <div class="column">
                        <a class="button mb-6 mt-2" href="/people/add">Add a contact</a>
                    </div>
                    <div class="column is-one-quarter">
                        <article class="media mt-2">
                            <div class="media-content">
                                <div class="field search-bar">
                                    <div class="control has-icons-left">
                                        <input
                                            class="input is-rounded"
                                            type="text"
                                            placeholder="Search"
                                            onChange={(e) => handleSearch(e.currentTarget.value)}
                                        />
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                    {searchData.map((s: Contact) => {
                        return (
                            <div class="box">
                                <a href={`/people/${s.id}`}>
                                    <article class="media">
                                        {s.thumbnail ? (
                                            <figure class="media-left">
                                                <p class="image is-64x64">
                                                    <img src={s.thumbnail} alt="thumbnail" width={128} />
                                                </p>
                                            </figure>
                                        ) : (
                                            <figure class="media-left">
                                                <p class="image is-64x64">
                                                <img class="is-rounded" src={"https://bulma.io/images/placeholders/64x64.png"} alt="thumbnail" width={128} />
                                                </p>
                                            </figure>
                                        )}
                                        <div class="media-content">
                                            <div class="content">
                                                <p class="has-text-black"><strong>{s.name}</strong>
                                                <br />
                                                {s.notes}
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
            {!isLoading && contactData.length == 0 && (
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

export { GetContacts };