(function () {
  class SalesChannelMix extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this._title = "SALES CHANNEL MIX";

      this._rows = [];

      this._barColors = [];

      this._trackColor = "#E7E5E4";

      this._unitText = "units";

      this.shadowRoot.innerHTML = `

        <style>

        *{
            box-sizing:border-box;
            font-family:Arial,sans-serif;
        }

        .outer{
            width:100%;
            height:100%;
            padding:4px;
        }

        .card{
            width:100%;
            height:100%;
            background:white;
            border-radius:8px;
            overflow:hidden;
            box-shadow:0 0 10px rgba(0,0,0,.10);
            display:flex;
            flex-direction:column;
        }

        .header{
            background:#16263B;
            color:white;
            padding:12px 16px;
            font-size:13px;
            font-weight:bold;
            letter-spacing:1px;
        }

        .body{
            flex:1;
            overflow-y:auto;
            padding:12px 16px;
        }

        .row{
            margin-bottom:16px;
            cursor:pointer;
        }

        .row-header{
            display:flex;
            justify-content:space-between;
            margin-bottom:4px;
        }

        .name{
            font-size:12px;
            font-weight:600;
            color:#16263B;
        }

        .percent{
            font-size:12px;
            font-weight:bold;
            color:#F97316;
        }

        .track{
            width:100%;
            height:8px;
            background:#E7E5E4;
            border-radius:20px;
            overflow:hidden;
        }

        .bar{
            height:100%;
            border-radius:20px;
            background:#F97316;
        }

        .footer{
            margin-top:4px;
            font-size:10px;
            color:#7D8CA3;
        }

        </style>

        <div class="outer">

            <div class="card">

                <div id="header" class="header"></div>

                <div id="body" class="body"></div>

            </div>

        </div>
        `;
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.shadowRoot.getElementById("header").innerHTML = this._title;

      const body = this.shadowRoot.getElementById("body");

      let html = "";

      this._rows.forEach((row, index) => {
        html += `

            <div
                class="row"
                data-index="${index}">

                <div class="row-header">

                    <div class="name">
                        ${row.name}
                    </div>

                    <div class="percent">
                        ${Number(row.percent).toFixed(2)}%
                    </div>

                </div>

                <div
                    class="track"
                    style="
                        background:${this._trackColor};
                    ">

                    <div
                        class="bar"
                        style="
                            width:${row.percent}%;
                            background:${this._barColors[index] || "#F97316"};
                        ">
                    </div>

                </div>

                <div class="footer">
                    ${Number(row.units).toLocaleString()}
                    ${this._unitText} -
                    ₹${Number(row.amount).toLocaleString()}
                    Cr
                </div>

            </div>
            `;
      });

      body.innerHTML = html;

      body.querySelectorAll(".row").forEach((row) => {
        row.addEventListener("click", () => {
          const index = Number(row.dataset.index);

          this.dispatchEvent(
            new CustomEvent("onSelect", {
              detail: this._rows[index],
            }),
          );
        });
      });
    }

    // ==========================
    // METHODS
    // ==========================

    setTitle(value) {
      this._title = value;

      this.render();
    }

    clearRows() {
      this._rows = [];

      this.render();
    }

    setRow(value) {
      const parts = value.split("|");

      const index = Number(parts[0]);

      this._rows[index] = {
        name: parts[1],

        percent: Number(parts[2]),

        units: Number(parts[3]),

        amount: Number(parts[4]),
      };

      this.render();
    }

    setBarColor(value) {
      const parts = value.split("|");

      const index = Number(parts[0]);

      this._barColors[index] = parts[1];

      this.render();
    }

    setTrackColor(value) {
      this._trackColor = value;

      this.render();
    }

    setUnitText(value) {
      this._unitText = value;

      this.render();
    }
  }

  if (!customElements.get("com-max-saleschannelmix")) {
    customElements.define("com-max-saleschannelmix", SalesChannelMix);
  }
})();
