const STORAGE_KEY =
    "vault_database";


let database;


const saved =
    localStorage.getItem(
        STORAGE_KEY
    );


if (saved) {

    try {

        database =
            JSON.parse(saved);

    } catch {

        database = {
            groups: [],
            items: []
        };

    }

} else {

    database = {

        groups: [],

        items: []

    };

}


function saveDatabase() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            database
        )

    );

}