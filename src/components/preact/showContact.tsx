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
                                    <label class="label">Name</label>
                                        <p>{contact?.name}</p>
                                    </div>
                                    {contact?.date_of_birth ? (
                                        <div class="field">
                                        <label class="label">Date of Birth</label>
                                            <p>{contact?.date_of_birth}</p>
                                        </div>
                                    ) : (null)}
                                    {contact?.workplace ? (
                                        <div class="field">
                                        <label class="label">Workplace</label>
                                            <p>{contact?.workplace}</p>
                                        </div>
                                    ) : (null)}
                                    {contact?.phone ? (
                                        <div class="field">
                                        <label class="label">Phone</label>
                                            <p>{contact?.phone}</p>
                                        </div>
                                    ) : (null)}
                                    {contact?.introduction ? (
                                        <div class="field">
                                        <label class="label">Introduction</label>
                                            <textarea class="textarea has-fixed-size" rows={5} placeholder="How you met this contact"  readonly>{contact?.introduction}</textarea>
                                        </div>
                                    ) : (null)}
                                    {contact?.notes ? (
                                        <div class="field">
                                        <label class="label">Notes</label>
                                            <textarea class="textarea has-fixed-size" rows={10} placeholder="Notes go here..."  readonly>{contact?.notes}</textarea>
                                        </div>
                                    ) : (null)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
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
                        repeatCount="indefinite" 
                        />
                    </path>
                </svg>
            )}
        </>
    )
}

export { ShowContact };