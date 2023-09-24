module.exports = [
  {
    input: "name",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      },
    ],
  },
  {
    input: "year",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi tahun buku",
      },
    ],
  },
  {
    input: "author",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi nama author buku",
      },
    ],
  },
  {
    input: "summary",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi summary buku",
      },
    ],
  },
  {
    input: "publisher",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi penerbit buku",
      },
    ],
  },
  {
    input: "pageCount",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi total halaman buku",
      },
    ],
  },
  {
    input: "readPage",
    rules: ["required", "lessThan:pageCount"],
    messages: [
      {
        name: "required",
        message:
          "Gagal menambahkan buku. Mohon isi total halaman buku yang sudah dibaca",
      },
      {
        name: "lessThan",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      },
    ],
  },
  {
    input: "reading",
    rules: ["required"],
    messages: [
      {
        name: "required",
        message: "Gagal menambahkan buku. Mohon isi status baca buku",
      },
    ],
  },
];
