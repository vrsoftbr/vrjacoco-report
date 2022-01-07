const render = require("../src/render");

describe("get PR Comment", function () {
  describe("no files", function () {
    const files = {
      files: [],
    };
    it("coverage greater than min coverage", function () {
      const comment = render.getPRComment(49.23, files, 30, 50);
      expect(comment).toEqual(
        `> There is no coverage information present for the Files changed

|Cobertura Total do Projeto|49.23%|:white_check_mark:|
|:-|:-:|:-:|`
      );
    });

    it("coverage lesser than min coverage", function () {
      const comment = render.getPRComment(49.23, files, 70, 50);
      expect(comment).toEqual(
        `> There is no coverage information present for the Files changed

|Cobertura Total do Projeto|49.23%|:x:|
|:-|:-:|:-:|`
      );
    });

    it("with title", function () {
      const comment = render.getPRComment(49.23, files, 70, 50, "Coverage");
      expect(comment).toEqual(
        `### Coverage
> There is no coverage information present for the Files changed

|Cobertura Total do Projeto|49.23%|:x:|
|:-|:-:|:-:|`
      );
    });
  });

  describe("multiple files", function () {
    const files = {
      files: [
        {
          filePath: "src/main/java/com/madrapps/jacoco/operation/StringOp.java",
          url: "https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java",
          name: "StringOp.java",
          covered: 7,
          missed: 0,
          percentage: 100,
        },
        {
          covered: 7,
          missed: 8,
          percentage: 46.67,
          filePath: "src/main/kotlin/com/madrapps/jacoco/Math.kt",
          name: "Math.kt",
          url: "https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt",
        },
      ],
      percentage: 63.64,
    };

    it("coverage greater than min coverage for overall project", function () {
      const comment = render.getPRComment(49.23, files, 30, 60);
      expect(comment).toEqual(
        `|Arquivo|Cobertura [63.64%]|:white_check_mark:|
|:-|:-:|:-:|
|[StringOp.java](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java)|100%|:white_check_mark:|
|[Math.kt](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt)|46.67%|:x:|

|Cobertura Total do Projeto|49.23%|:white_check_mark:|
|:-|:-:|:-:|`
      );
    });

    it("coverage lesser than min coverage for overall project", function () {
      const comment = render.getPRComment(49.23, files, 50, 64);
      expect(comment).toEqual(
        `|Arquivo|Cobertura [63.64%]|:x:|
|:-|:-:|:-:|
|[StringOp.java](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java)|100%|:white_check_mark:|
|[Math.kt](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt)|46.67%|:x:|

|Cobertura Total do Projeto|49.23%|:x:|
|:-|:-:|:-:|`
      );
    });

    it("coverage greater than min coverage for changed files", function () {
      const comment = render.getPRComment(49.23, files, 30, 80);
      expect(comment).toEqual(
        `|Arquivo|Cobertura [63.64%]|:x:|
|:-|:-:|:-:|
|[StringOp.java](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java)|100%|:white_check_mark:|
|[Math.kt](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt)|46.67%|:x:|

|Cobertura Total do Projeto|49.23%|:white_check_mark:|
|:-|:-:|:-:|`
      );
    });

    it("coverage lesser than min coverage for overall project", function () {
      const comment = render.getPRComment(49.23, files, 50, 20);
      expect(comment).toEqual(
        `|Arquivo|Cobertura [63.64%]|:white_check_mark:|
|:-|:-:|:-:|
|[StringOp.java](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java)|100%|:white_check_mark:|
|[Math.kt](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt)|46.67%|:white_check_mark:|

|Cobertura Total do Projeto|49.23%|:x:|
|:-|:-:|:-:|`
      );
    });

    it("with title", function () {
      const comment = render.getPRComment(49.23, files, 50, 20, "Coverage");
      expect(comment).toEqual(
        `### Coverage
|Arquivo|Cobertura [63.64%]|:white_check_mark:|
|:-|:-:|:-:|
|[StringOp.java](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/java/com/madrapps/jacoco/operation/StringOp.java)|100%|:white_check_mark:|
|[Math.kt](https://github.com/thsaravana/jacoco-playground/blob/77b14eb61efcd211ee93a7d8bac80cf292d207cc/src/main/kotlin/com/madrapps/jacoco/Math.kt)|46.67%|:white_check_mark:|

|Cobertura Total do Projeto|49.23%|:x:|
|:-|:-:|:-:|`
      );
    });
  });
});
