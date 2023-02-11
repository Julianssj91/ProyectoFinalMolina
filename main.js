$(document).ready(function () {
    Swal.fire({
        title: "Bienvenido a mi Pokedex",
        text: "Aqui podrás buscar tu Pokemon favorito por nombre o número",
        imageUrl: "pokeballintro.png",
        confirmButtonColor: "#FF0000",
        showConfirmButton: true,
    });
    let searchHistory = [];





    $("#searchBtn").click(function () {
        let pokemonInput = $("#pokemonInput").val();

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
            .then(response => response.json())
            .then(response => {
                let { id, name, weight, height, type } = response;

                let pokemonInfo = {
                    id,
                    name,
                    weight,
                    height,
                    type: response.types[0].type.name,
                };


                searchHistory.push(pokemonInfo);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

                $("#pokemonInfo").removeClass("d-none");
                $("#pokemonImage").attr("src", response.sprites.front_default);
                $("#pokemonName").text(response.name);
                $("#pokemonId").text(`ID: ${response.id}`);
                $("#pokemonWeight").text(`Peso: ${response.weight}`);
                $("#pokemonHeight").text(`Altura: ${response.height}`);
                $("#pokemonType").text(`Tipo: ${response.types[0].type.name}`);

                displaySearchHistory();
            })
            .catch(error => {
                Swal.fire({
                    title: "Pokemon no encontrado!",
                    text: "Quizá has escrito mal su nombre o ID... o quizá sea un Pokemon nunca antes visto!😨",
                    imageUrl: "pokeballintro.png",
                    confirmButtonColor: "#FF0000",
                    showConfirmButton: true,
                });
            });
    });




    function displaySearchHistory() {
        $("#searchHistory").empty();

        for (let i = 0; i < searchHistory.length; i++) {
            let pokemon = searchHistory[i];

            let row = `
            <tr>
            <td>${pokemon.id}</td>
            <td>${pokemon.name}</td>
            <td>${pokemon.weight}</td>
            <td>${pokemon.height}</td>
            <td>${pokemon.type}</td>
            </tr>`; $("#searchHistory").append(row);
        }
    }



    $("#clearHistory").click(function () {
        searchHistory = [];
        localStorage.removeItem("searchHistory");
        displaySearchHistory();

        Toastify({
            text: "HISTORIAL BORRADO!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: 'left',
            backgroundColor: "linear-gradient(to right, #FF0000, #6b0404)"
        }).showToast();
    });

    

    if (localStorage.getItem("searchHistory")) {
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        displaySearchHistory();
    }

    

});
