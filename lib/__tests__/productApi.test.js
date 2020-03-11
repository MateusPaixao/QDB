const request = require("supertest");

describe("VtexSearchAPI", () => {
  it("should get 1 Product from Vtex API", async () => {
    const res = await request("http://qbbr.vtexcommercestable.com.br/")
      .get("/api/catalog_system/pub/products/search/?productId=270")
      .send();

    expect(String(res.statusCode)).toMatch(/^200|206$/);
    expect(res.text).toContain("productName");
  });

  it("should get more than one Product from Vtex API", async () => {
    const res = await request("http://qbbr.vtexcommercestable.com.br/")
      .get(
        "/api/catalog_system/pub/products/search/?&fq=productId:191&fq=productId:189&fq=productId:864&fq=productId:721"
      )
      .send();

    expect(String(res.statusCode)).toMatch(/^200|206$/);
    const content = JSON.parse(res.text);
    expect(content.length).toEqual(4);
  });
});
