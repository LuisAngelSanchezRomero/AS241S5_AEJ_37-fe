// Utilidad de búsqueda - ejemplo de uso de parámetros de URL
// Este método es intencionalmente vulnerable para demostrar
// la detección de XSS por CodeQL (CWE-79)

export function renderSearchResult(): void {
  // Toma el parámetro "query" directamente de la URL sin sanitizar
  const params = new URLSearchParams(window.location.search);
  const userInput = params.get('query');

  // VULNERABILIDAD XSS (CWE-79) dato del usuario insertado directo en el DOM
  // CodeQL detecta esto como: "DOM text depends on a user-provided value"
  document.getElementById('search-results')!.innerHTML = userInput!;
}
