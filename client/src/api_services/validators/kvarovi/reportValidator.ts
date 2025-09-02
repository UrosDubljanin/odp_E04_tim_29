export type RezultatValidacije = { uspesno: boolean; poruka?: string };

export function validacijaPrijaveKvaraClient(
  naziv?: string,
  opis?: string,
  stanBr?: string
): RezultatValidacije {
  if (!opis || !stanBr) {
    return { uspesno: false, poruka: "Opis i adresa su obavezni." };
  }

  const nazivTrim = naziv ? naziv.trim() : "";
  const opisTrim = opis ? opis.trim() : "";
  const stanTrim = stanBr ? stanBr.trim() : "";

  if (opisTrim.length < 5) {
    return { uspesno: false, poruka: "Opis mora imati najmanje 5 karaktera." };
  }

  if (opisTrim.length > 2000) {
    return { uspesno: false, poruka: "Opis može imati najviše 2000 karaktera." };
  }

  if (nazivTrim && nazivTrim.length < 3) {
    return { uspesno: false, poruka: "Naslov, ako postoji, mora imati najmanje 3 karaktera." };
  }

  if (nazivTrim.length > 200) {
    return { uspesno: false, poruka: "Naslov može imati najviše 200 karaktera." };
  }

  if (stanTrim.length > 200) {
    return { uspesno: false, poruka: "Adresa može imati najviše 200 karaktera." };
  }

  return { uspesno: true };
}
