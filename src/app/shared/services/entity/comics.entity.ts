export class Comics{
    code: number | undefined;
    status: string | undefined;
    copyright: string | undefined;
    attributionText: string | undefined;
    attributionHTML: string | undefined;
    data: Data | undefined
    etag: string | undefined;
}

class Data {
    offset: number | undefined;
    limit: number | undefined;
    total: number | undefined;
    count: number | undefined;
    results: Results[] | undefined;

}

class Results {
    id: number | undefined;
    digitalId: number | undefined;
    title: string | undefined;
    issueNumber: number | undefined;
    variantDescription: string | undefined;
    description: string | undefined;
    modified: string | undefined;
    isbn: string | undefined;
    upc: string | undefined;
    diamondCode: string | undefined;
    ean: string | undefined;
    issn: string | undefined;
    format: string | undefined;
    pageCount: number | undefined;
    textObjects: TextObjects[] | undefined;
    resourceURI: string | undefined;
    urls: Urls[] | undefined;
    series: ResourceUri | undefined;
    variants: ResourceUri | undefined;
    collections: ResourceUri | undefined;
    collectedIssues: ResourceUri | undefined;
    dates: Dates[] | undefined;
    prices: Prices[] | undefined;
    thumbnail: Path[] | undefined;
    images: Path[] | undefined;
    creators: CollectionUri | undefined;
    characters: CollectionUri | undefined;
    stories: CollectionUri | undefined;
    events: CollectionUri | undefined;
}

class TextObjects {
    type: string | undefined;
    language: string | undefined;
    text: string | undefined;
}

class Urls {
    type: string | undefined;
    url: string | undefined;
}

class ResourceUri {
    resourceURI: string | undefined;
    name: string | undefined;
}

class Dates{
    type: string | undefined;
    date: string | undefined;
}

class Prices{
    type: string | undefined;
    price: string | undefined;
}

class Path{
    path: string | undefined;
    extension: string | undefined;  
}

class CollectionUri{
    available: number | undefined;
    returned: number | undefined;
    collectionURI: string | undefined;
    items: Item[] | undefined;
}

class Item {
    resourceURI: string | undefined;
    name: string | undefined;
    role: string | undefined;
}