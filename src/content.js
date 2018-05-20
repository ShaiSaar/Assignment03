function Content(element) {
    element.value = `[
        {
            "type": "group",
            "name": "Friends",
            "items": [
                {
                    "type": "group",
                    "name": "Best Friends",
                    "items": [
                        {
                            "type": "user",
                            "name": "Tommy"
                        },
                        {
                        "type": "group",
                        "name": "family",
                        "items": [
                            {
                                "type": "user",
                                "name": "Shai"
                            },
                             {
                                "type": "user",
                                "name": "Shira"
                            },
                             {
                                "type": "user",
                                "name": "Tahel"
                            }
                    ]
                    }
                    ]
                },
                {
                    "type": "user",
                    "name": "Udi"
                }
            ]
        },
            {
                "type": "user",
                "name": "Ori"
            },
            {
                "type": "user",
                "name": "Roni"
            },
            {
                        "type": "group",
                        "name": "Guyss",
                        "items": [
                            {
                                "type": "user",
                                "name": "Shai"
                            },
                             {
                                "type": "user",
                                "name": "Ariel"
                            },
                             {
                                "type": "user",
                                "name": "Ohad"
                            }
                    ]
                    }
        ]`;

    function get() {
        const res = JSON.parse(element.value);
        return res;
    }

    return {
        get,
    };
}
