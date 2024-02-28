<div align="center">
<img alt="SAP HUB - A fan-made website for Super Auto Pets" src="https://github.com/fluid-design-io/SAP-hub/blob/main/app/icon.png?raw=true" width='256' height='256'>
</div>

<a href="https://saphub.vercel.app/">
  <h1 align="center">SAP HUB</h1>
</a>

<p align="center">
 A fan-made website for Super Auto Pets
</p>

## Features

-   Super Cool UI ✨
-   Popular builds 🔨
-   Powerfull full-text search 📝
-   Tutorials 📚
-   Updates 🚀

## Installation

Use the package manager [bun](https://bun.sh/) to install SAP HUB.

```bash
bun install
```

## Seed Data

SAP Hub uses [supabase](https://supabase.io/) as a backend database, you need to first install
the supabase local CLI and run `supabase start` to start the local server.

The data is stored under `public/data` folder. To populate the data, run the following command:

```bash
bun seed
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Roadmap

- [ ] Filter pets, food, toys, and custom packs ✨
- [ ] When viewing a pet, food, show related pet or food that goes well with it 🐾 For example, Tiger + Lionfish, Jerboa + Apple, etc...
- [ ] Smart hover on pets, food, toys, and custom packs 🐾 (Similair to Wiki hover card)
- [ ] Sectioned tutorials for better navigation 📚
- [ ] More tutorials and resources 📖

## License

[MIT](https://choosealicense.com/licenses/mit/)
