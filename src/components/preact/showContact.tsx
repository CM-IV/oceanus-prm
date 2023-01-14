import { useState, useEffect } from "preact/hooks";

const ShowContact = ({ data }: any) => {
    const [contact, setContact] = useState<Contact>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchContact = async () => {
        try {
            const contactData = await fetch(`/api/contacts/${data}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const info = await contactData.json();
            setContact(info);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchContact();
    }, [])

    return (
        <>
            {!isLoading ? (
                <>
                    <div class="columns is-centered">
                        <div class="column is-three-quarters">
                            <div class="box">
                                {contact?.thumbnail ? (
                                    <figure class="image is-128x128" id="logo">
                                        <img class="is-rounded" src={contact?.thumbnail} alt="thumbnail" width={128} />
                                    </figure>
                                ) : (
                                    <figure class="image is-128x128" id="logo">
                                        <img class="is-rounded" src={"https://bulma.io/images/placeholders/128x128.png"} alt="thumbnail" width={128} />
                                    </figure>
                                )}
                                <div class="content">
                                    <p class="has-text-centered mt-2">
                                        <strong>{contact!.name}</strong> <small>{contact?.email}</small>
                                    </p>
                                    <a id="btn" class="button" href={`/people/${contact!.id}/edit`}>Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <div class="column is-three-quarters">
                            <div class="box">
                                <div class="content">
                                    <div class="field">
                                        <label class="label">Date of Birth</label>
                                        <p>{contact?.date_of_birth}</p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Workplace</label>
                                        <p>{contact?.workplace}</p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Phone</label>
                                        <p>{contact?.phone}</p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Notes</label>
                                        <textarea class="textarea has-fixed-size" rows={10} placeholder="Notes go here..."  readonly>{contact?.notes}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <img src="/svg/loading.svg" alt="loading" width={200} />
            )}
        </>
    )
}

export { ShowContact };