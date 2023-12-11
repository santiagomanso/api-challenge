# REST API Backend Test - MyPokeAPI

A Pokemon RESTapi ready to serve Pokemon resources!

## TECH STACK 🛠️

Node, TypeScript, Express, Prisma, supabase (PostgreSQL), Zod, Docker

## INSTALATION

Install the project with the following commands

```bash
  cd apiTest
  npm install
```

## ENVIRONMENT VARIABLES

To run this project, the following environment variables are needed in the .env file

```bash
DATABASE_URL="postgresql://postgres:NyN$$123@!fibonacci@db.ghavzwsedcybunspielj.supabase.co:5432/postgres"

SERVER_PORT=4000
```

## RUN LOCALLY 🏚️

Run ALL-IN-ONE `recomended⭐`

```bash
  npm run dev
```

This command will execute the dev script, located inside the `package.json` file, which has the following 3 concatenated commands:

- `npx prisma generate`: is responsible for the generation of the Prisma client.
- `npm run data:import`: is used to call the `dataImport` function, which dynamically loads the pokemon from the POKEAPI and transforms them to insert them into our Mypokeapi🔥. _(see file `src/ seeder.ts`)_.
- `npx tsx watch src/index.ts`: this last script is used to start the server, at this time it is ready to receive requests and respond accordingly.

## DOCKER 🐋

This solution is dockerized, you can clone the image and run it from the docker-hub. To clone the image run the following command

```bash
docker pull santiagomanso/rest-api:0.0.1.RELEASE
```

Once the image has been cloned, run the container with the following command

```bash
docker run -d -p 4000:4000 santiagomanso/rest-api:0.0.1.RELEASE
```

Once this is done, the API will be ready to process requests.🚀

## FEATURES

- Full CRUD (`GET`, `POST`, `PATCH`, `DELTE`)
- Validations on all endpoints
- Data fetching from external API _(Poke API)_, transformation and insertion of such data into the database🔥.
- M.V.C _(model-view-controller)_ architecture.

## API REFERENCE

#### Get ALL pokemons

```bash
  GET /mypokeapi/
```

This endpoint does not require any parameters of any kind.

#### Get a single Pokemon by ID 🪪

```bash
  GET /mypokeapi/id
```

| PARAMETER | TYPE  | URL | BODY | MANDATORY   | DESCRIPTION       |
| :-------- | :---- | :-- | :--- | :---------- | :---------------- |
| `id`      | `int` | YES | NO   | `mandatory` | unique identifier |

#### Create a new Pokemon

```bash
  POST /mypokeapi/new
```

| PARAMETER | TYPE       | URL | BODY | MANDATORY   | DESCRIPTION         |
| :-------- | :--------- | :-- | :--- | :---------- | :------------------ |
| `id`      | `int`      | NO  | YES  | `mandatory` | unique identifier   |
| `name`    | `string`   | NO  | YES  | `mandatory` | name                |
| `weight`  | `int`      | NO  | YES  | `mandatory` | weight              |
| `types`   | `string[]` | NO  | YES  | `mandatory` | types (_see enums_) |

#### Update an existing Pokemon by ID 🪪

```bash
  PATCH /mypokeapi/update/id
```

| PARAMETER | TYPE       | URL | BODY | MANDATORY   | DESCRIPTION         |
| :-------- | :--------- | :-- | :--- | :---------- | :------------------ |
| `id`      | `int`      | YES | NO   | `mandatory` | unique identifier   |
| `name`    | `string`   | NO  | YES  | NO          | name                |
| `weight`  | `int`      | NO  | YES  | NO          | weight              |
| `types`   | `string[]` | NO  | YES  | NO          | types (_see enums_) |

#### Delete a Pokemon by ID 🪪

```bash
  DELTE /mypokeapi/delete/id
```

| PARAMETER | TYPE  | URL | BODY | MANDATORY   | DESCRIPTION       |
| :-------- | :---- | :-- | :--- | :---------- | :---------------- |
| `id`      | `int` | YES | NO   | `mandatory` | unique identifier |

## HOW TO USE / EXAMPLES

Making a curl to the API

```bash
 curl localhost:4000/mypokeapi/4
```

It gives us as a result a JSON object with the following shape

```json
{
  "pokemon": {
    "id": 4,
    "name": "charmander",
    "weight": 85,
    "types": ["fire"]
  }
}
```

### EXAMPLES WITHOUT CURL

to simplify ♻️ the demonstration of the operation of this API I have included a file "**src /api.http**" whose purpose is to have preloaded the different requests to our API, for it is enough to click in _send request_ and the result will be painted in a new tab of VSCODE.
To be able to make use of this functionality it is necessary to install the following extension in VSCODE: **REST CLIENT**.

![REST CLIENT screenship](https://i.ibb.co/4NKtVsv/image.png 'With this extension we can see the results at the time of the test.')

### EXAMPLE GET POKEMON PIKACHU⚡ WITH `id` 25

![ejemplo getPokemonById pikachu](https://i.ibb.co/XZvQWFV/image.png 'With this extension we can see the results at the time of the test.')

### CREATING A NEW POKEMON

![creamos un nuevo pokemon](https://i.ibb.co/VDzVdZw/image.png 'creating a new pokemon, terreneitor')

In the example we can see how a pokemon is created, as we can also see how in the request, both the name and the types are not formatted correctly and then when introducing the new pokemon to the database, these fields are correctly formatted.

### UPDATING THE SAME POKEMON WITH IT's ID

![actualizando pokemon por id](https://i.ibb.co/6PTXbxm/image.png 'updating the name of terreneitor')

## OPERATION IN DETAIL 💻

#### SEEDER

file **src /seeder.ts**: It is in charge of acting as a seeder, it contains two functions

- _importData_: popularize the database hosted in SUPABASE.
- _destroyData_: perform a DROP (_delete_) all database resources.

file: **utils /fetchAndParseFromPokeAPI.ts**. It contains two auxiliary functions that are in charge of doing a `fetch()` to the pokeapi, to obtain the 151 (the original pokemons💓) and then to strip them of properties foreign to our interest by calling the second auxiliary function `sanitizePokemons()`.

- `fetchAndParseFromPokeAPI()` : This function is responsible for doing the fetch to the pokeapi api with the following url ***https://pokeapi.co/api/v2/pokemon?limit=151*** _(brings us the original 151 pokemons💓)_, once obtained the pokemons calls the following auxiliary function.
- `sanitizePokemons( pokemonArray: InitialPokemon [ ] )` :This function receives an array of pokemons with the following typing _InitialPokemon_. the shape of all objects is as follows:

```typescript
initialPokemon:{
  name: string,
  url: string
}
```

all 151 pokemon have this form. However, we are interested in a list with pokemon with the following properties: `ID`, `NAME`, `WEIGHT`, `TYPES` (array of characters), so we must make a new FETCH for each pokemon taking advantage that these objects of type (InitialPokemon) have the URL property.

Then the function `sanitizePokemons()` creates an array of promises of type `SinglePokemon[ ]`, and this array is defined using a map, and the object that returns the map to store inside the promise has the form `SinglePokemon [ ]` discarding this way the properties that are not of our interest and only conserving those that are of importance for this api.
Then to resolve all the promises together we use the `Promise.all()` method and return a new array called parsedPokemons of type `SinglePokemon [ ]` that finally is returned by the first function `getAllPokemons()`, and from there it is invoked by the function importData of the file `src /seeder.ts`.

#### PRISMA CONFIGURATION

file **prisma /schema.prisma**.

- _`client`_: this file contains the configuration of the prisma client, the connection string to the database and the models of the above mentioned tables.

- _`generatorClient`_: it is in charge of generating the prisma javascript client (prisma also generates clients for other languages, but we are only interested in JS).

- _`datasourceDB`_: configuration object where the unique database connection string is stored (in this case it is located in the `.env` file), and the database provider, in this case **postgresql** 🐘.

#### PRISMA CLIENT

file **config /prismaClient.ts**: Here you create a new instance of the prisma client and export it to be used in the different controllers of the API, without this file you would create multiple instances for each function of each controller. This way it is created only once and exported in the following way _`export const prisma = new PrismaClient()`_ and then it is used wherever it is needed only by importing it and invoking its methods directly: **prisma.pokemons.findById()** or **prisma.pokemons.create()**.

#### ZOD SCHEMAS

Zod is a library for declaring and validating schemas in `TypeScript` 💓. It facilitates the definition and validation of data structures by providing concise syntax and robust validation capabilities.

file: **validations /pokemon-schemas.ts**: Here we find the schemas that will be used to validate the bodies and parameters of HTTP requests received by our API. As it is made with `TypeScript` we can take advantage of the types and interfaces to define the arguments that will receive the functions that validate the schemas, for example:

```typescript
const patchBodySchema = z.object({
  name: z.string().min(1, 'At least one char').optional(),
  weight: z.coerce
    .number({ invalid_type_error: 'weight must be a number' })
    .int()
    .min(1)
    .optional(),
  types: z.array(z.nativeEnum(PokemonEnums)).optional(),
})
```

This schema is an object that must comply with the following form 🔹:

- `NAME`: must be a `String` with at least 1 character and may be optional.
- `WEIGHT`: must be an `INT` (cannot be negative), of at least 1 and may be optional.
- `TYPES`: is an array of characters that come from the ENUMS that are defined in _`types /pokemon-interfaces.ts`_, if you pass a `string` that does not match any of the enums provided it will give an error.

Validation of the schemas: to validate a parameter a function is called that in turn invokes the `schema.safeParse`, this is in charge of validating the properties of the object that receives against the properties of the defined schema.

```typescript
export const validatePatchBody = (input: SinglePokemon) => {
  input.name ? (input.name = input.name.trim().toLowerCase()) : ''
  if (input.types.length > 0) {
    const transformedInput = {
      ...input,
      types: input.types.map((type) => type.toLowerCase().trim()),
    }
    return patchBodySchema.safeParse(transformedInput)
  } else return patchBodySchema.safeParse(input)
}
```

This function receives an input object, which is of type `SinglePokemon`, here we take advantage of the use of `TypeScript` to facilitate the work of validating.
If the name property exists, we perform a _`.trim()`_ to remove empty spaces at the end and at the beginning and then a _`.toLoverCase()`_ to ensure data consistency, since the names are stored in lowercase and without spaces; we do not know how the operator can introduce the values and later it could be of vital importance for a search by name. The same happens when detecting that a type array is passed to the input object, a loop will be performed and it will be transformed to lowercase and whitespaces will be removed at the beginning and end, keeping the other properties of the iterated object with the spread operator.

#### TYPES / INTERFACES ⚡

To ensure data consistency throughout the application, there are different interfaces and `TypeScript` types that are applied to different data structures such as objects and/or arrays, these are detailed below.
`types /pokemon-interfaces.ts`

- _interface `InitialPokemon`_: object with the following form `name:string, url:string`. This interface is used inside the auxiliary function getAllPokemons to type the initial fetch of the 151 pokemon.
- _interface `SinglePokemon`_: it is used in the `sanitizePokemons()` function to strip the pokemon of properties that are not of interest. It is also used by zod schemas to type request inputs in POST and PATCH methods,
- _type `SinglePokemon`[ ]_: array type in the form of `SinglePokemon`. This type is used in the auxiliary function getAllPokemons()
- _`enum PokemonEnums`_: enums object representing the TYPE attribute that is not mutable, these enums are used in the zod schemas to validate the parameters and the body of the HTTP `POST` and `PATCH` requests, not passing a TYPE that corresponds to at least one of these enums throws a zod error indicating information pertinent to the field.

##

#### REQUESTS AND RESPONSES 📦.

The API listens for the route ' /mypokeapi ' and makes available a router called pokemonRouter, which thanks to express is able to facilitate the routing and the switch of the URL, allowing us to organize in a simpler way the routes under the router called `pokemonRouter`; it also responds for the following routes.

- Root `'/'`, when querying the root the API will respond with an index.html styled with `Tailwind CSS` that serves as HomePage.
- `*`: Any Path other than `/mypokeapi` or `/` the api will respond with a `404 - Not Found`.

#### PokemonRouter

This express router uses `.get()` `.post()` `.patch()` `.delete()` methods and once a request is made to any of these the router calls the class _PokemonController🔄️_ and makes use of a function declared inside this class, see _pokemon-controller.ts_.
example: a GET request made on the following endpoint: **GET http://localhost:4000/mypokeapi/** will trigger the following router call:

```typescript
pokemonRouter.get('/', PokemonController.getAll)
```

_getAll_: this function declared in _PokemonController🔄️_ will be in charge of calling Model _PokemonModel🔄️_ to receive the pokemon as follows:

```typescript
const pokemons = await PokemonModel.getAll()
```

The Model is only in charge of interacting with the database by means of **Prisma** and returning an array of Pokemon to the Controller, it is there where the data flow continues; after validating that the pokemon received by the Model exist, the `res` response of the controller will be an array of all the pokemon with which the database is populated at the moment of making this `req` request. _Author's opinionated note: The VIEW in this case is the JSON object itself, since it is a way to represent the processed information, but it could well be a screen of some app made with React. js, React-Native, Angular, or also a JSON, since it is a way to represent the processed information._
Conclusion: The MVC is an architectural pattern that focuses on separating the responsibility in 3 well defined parts MODEL-VIEW-CONTROLLER, they do not need to know how the other works, they only take care of their own responsibility.

- Model: it is in charge of accessing the database, updating data. It is the business logic.
- View: this defines how the application data should be displayed.
- Controller: acts as an intermediary between the Model and the View; it contains logic that updates the model and/or view in response to inputs from the application's users.

  ![MVC](mvc-chart.png 'MVC Diagram')

### LET'S TAKE A CLOSER LOOK AT THE PATCH METHOD

endpoint: `bash://localhost:4000/mypokeapi/update/:id`: A _req_ request to this endpoint will cause the express router to call the _update_ function defined inside the _PokemonController.ts_ that receives an _id_ as parameter, because the req is typed with typescript and validated with zod, the first thing to do will be to call the function that validates the `id` with the corresponding schema of zod, the function is called `validateId()` and receives an object as parameter. Inside this function, Zod validates the ID, converts it to a number and ensures that it is an integer, an INT.

```typescript
const getByIdSchema = z
  .object({
    id: z.coerce
      .number({ invalid_type_error: 'id must be a number' })
      .int({
        message: 'id must be positive',
      })
      .min(1, {
        message: 'id must be at least 1',
      }),
  })
  .required()
```

The `safeParse(input)` function returns an object that has one property in case the validation was successful, or two properties in case there is an error. For the correct handling of errors we must ask if the property `!success` is false, and only in that moment we will obtain access to the error property, this is an own behavior of **TypeScript**, remember that zod is constructed in its totality in this language.

```typescript
export const validateId = (input: { id: number }) => {
  return getByIdSchema.safeParse(input)
}
```

The data flow continues as follows: we already have an `id` correctly converted into INT, and we can look for the desired pokemon💓 to update it! Remembering the MVC architecture, the controller does not care how to retrieve our beloved pokemon, the only one who knows how to find it is the MODEL, the PokemonModel. We will ask this model to ship a pokemon where the id matches the id we have stored in the `parsedId` object.

```typescript
const existingPokemon = await PokemonModel.getById(parsedId.data.id)
```

If the MODEL does not find a pokemon, it will return undefined and therefore the api will return a `res` response with status 404 indicating that the pokemon was not found:

```typescript
if (!existingPokemon) {
  return res.status(404).json({
    message: 'Pokemon not found',
  })
}
```

Otherwise, we have a pokemon in existence💓, then we will proceed to validate what we have received in the req.body _(this is injected by the express midleware in the index.ts file)_; this `req.body` is passed to a validatePatchBody function that will check that the `NAME`, `WEIGHT`, `TYPES` fields are in agreement with the `patchBodySchema` which is an object whose properties. **Before validating the req.body** with zod, we must check if there is a TYPES array inside the `req`, in case we do not find the TYPES array _(electric, fight, voldaor etc.)_ we must assign it, since we have it inside our existing pokemon existingPokemon, this is because the zod schema expects the types.

```typescript
if (!req.body.types) {
  req.body.types = existingPokemon.types
}
```

Now we can validate and once we have the validation ready, it will be stored in an object called `parsedBody`. It is at this moment that we can ask the MODEL to update the pokemon with the data coming from the request, with the id located in parsedId and the body in parsedBody.

```typescript
const updatedPokemon = await PokemonModel.updateById({
  id: parsedId.data.id,
  input: parsedBody.data,
})
```

If there is an error when updating the pokemon, we will return a response with code 500 and a message indicating the error.
Otherwise, we are in the situation that the pokemon has been correctly updated and then we will return a code 200, indicating that the `req` was correctly processed, and we will also return the updated pokemon.

```typescript
return res.status(200).json({
  updatedPokemon: updatedPokemon,
})
```

**HOW TO TACKLE THE POTENTIAL ID CHANGE**: in this update, we do not want to change the `ID` of the pokemon, remember that the SinglePokemon object has an id property declared in this interface and it is this interface that we use to type the input that receives the function that validates the patch method schema.

```typescript
export interface SinglePokemon {
  id: number
  //...rest of the interface
}
```

```typescript
export const validatePatchBody = (input: SinglePokemon)=> {
  input.name ? (input.name = input.name.trim().toLowerCase()) : ''
  if (input.types.length > 0) {
    const transformedInput = {
  //...rest of the code
}
```

Then the question arises, how do we avoid the ID change? With the same zod schema, the `patchBodySchema`, if we look closely there is no `id` property in that object, then ZOD does not care that you can pass properties like `id`, `sql` `password`, any extra property you pass it, Zod will simply ignore it.

```typescript
const patchBodySchema = z.object({
  // there is no property ID
  name: z.string().min(1, 'At least one char').optional(),
  weight: z.coerce
    .number({ invalid_type_error: 'weight must be a number' })
    .int()
    .min(1)
    .optional(),
  types: z.array(z.nativeEnum(PokemonEnums)).optional(),
})
```

## Author

- [@Santiago Manso Castro](https://github.com/santiagomanso)
