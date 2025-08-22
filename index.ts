import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app: Application = express();

type StorefrontResponse = {
  FeaturedBundle: {
    Bundle: {
      /** UUID */
      ID: string;
      /** UUID */
      DataAssetID: string;
      /** Currency ID */
      CurrencyID: string;
      Items: {
        Item: {
          /** Item Type ID */
          ItemTypeID: string;
          /** Item ID */
          ItemID: string;
          Amount: number;
        };
        BasePrice: number;
        /** Currency ID */
        CurrencyID: string;
        DiscountPercent: number;
        DiscountedPrice: number;
        IsPromoItem: boolean;
      }[];
      ItemOffers:
        | {
            /** UUID */
            BundleItemOfferID: string;
            Offer: {
              OfferID: string;
              IsDirectPurchase: boolean;
              /** Date in ISO 8601 format */
              StartDate: string;
              Cost: {
                [x: string]: number;
              };
              Rewards: {
                /** Item Type ID */
                ItemTypeID: string;
                /** Item ID */
                ItemID: string;
                Quantity: number;
              }[];
            };
            DiscountPercent: number;
            DiscountedCost: {
              [x: string]: number;
            };
          }[]
        | null;
      TotalBaseCost: {
        [x: string]: number;
      } | null;
      TotalDiscountedCost: {
        [x: string]: number;
      } | null;
      TotalDiscountPercent: number;
      DurationRemainingInSeconds: number;
      WholesaleOnly: boolean;
    };
    Bundles: {
      /** UUID */
      ID: string;
      /** UUID */
      DataAssetID: string;
      /** Currency ID */
      CurrencyID: string;
      Items: {
        Item: {
          /** Item Type ID */
          ItemTypeID: string;
          /** Item ID */
          ItemID: string;
          Amount: number;
        };
        BasePrice: number;
        /** Currency ID */
        CurrencyID: string;
        DiscountPercent: number;
        DiscountedPrice: number;
        IsPromoItem: boolean;
      }[];
      ItemOffers:
        | {
            /** UUID */
            BundleItemOfferID: string;
            Offer: {
              OfferID: string;
              IsDirectPurchase: boolean;
              /** Date in ISO 8601 format */
              StartDate: string;
              Cost: {
                [x: string]: number;
              };
              Rewards: {
                /** Item Type ID */
                ItemTypeID: string;
                /** Item ID */
                ItemID: string;
                Quantity: number;
              }[];
            };
            DiscountPercent: number;
            DiscountedCost: {
              [x: string]: number;
            };
          }[]
        | null;
      TotalBaseCost: {
        [x: string]: number;
      } | null;
      TotalDiscountedCost: {
        [x: string]: number;
      } | null;
      TotalDiscountPercent: number;
      DurationRemainingInSeconds: number;
      WholesaleOnly: boolean;
    }[];
    BundleRemainingDurationInSeconds: number;
  };
  SkinsPanelLayout: {
    SingleItemOffers: string[];
    SingleItemStoreOffers: {
      OfferID: string;
      IsDirectPurchase: boolean;
      /** Date in ISO 8601 format */
      StartDate: string;
      Cost: {
        [x: string]: number;
      };
      Rewards: {
        /** Item Type ID */
        ItemTypeID: string;
        /** Item ID */
        ItemID: string;
        Quantity: number;
      }[];
    }[];
    SingleItemOffersRemainingDurationInSeconds: number;
  };
  UpgradeCurrencyStore: {
    UpgradeCurrencyOffers: {
      /** UUID */
      OfferID: string;
      /** Item ID */
      StorefrontItemID: string;
      Offer: {
        OfferID: string;
        IsDirectPurchase: boolean;
        /** Date in ISO 8601 format */
        StartDate: string;
        Cost: {
          [x: string]: number;
        };
        Rewards: {
          /** Item Type ID */
          ItemTypeID: string;
          /** Item ID */
          ItemID: string;
          Quantity: number;
        }[];
      };
      DiscountedPercent: number;
    }[];
  };
  AccessoryStore: {
    AccessoryStoreOffers: {
      Offer: {
        OfferID: string;
        IsDirectPurchase: boolean;
        /** Date in ISO 8601 format */
        StartDate: string;
        Cost: {
          [x: string]: number;
        };
        Rewards: {
          /** Item Type ID */
          ItemTypeID: string;
          /** Item ID */
          ItemID: string;
          Quantity: number;
        }[];
      };
      /** UUID */
      ContractID: string;
    }[];
    AccessoryStoreRemainingDurationInSeconds: number;
    /** UUID */
    StorefrontID: string;
  };
  /** Night market */
  BonusStore?:
    | {
        BonusStoreOffers: {
          /** UUID */
          BonusOfferID: string;
          Offer: {
            OfferID: string;
            IsDirectPurchase: boolean;
            /** Date in ISO 8601 format */
            StartDate: string;
            Cost: {
              [x: string]: number;
            };
            Rewards: {
              /** Item Type ID */
              ItemTypeID: string;
              /** Item ID */
              ItemID: string;
              Quantity: number;
            }[];
          };
          DiscountPercent: number;
          DiscountCosts: {
            [x: string]: number;
          };
          IsSeen: boolean;
        }[];
        BonusStoreRemainingDurationInSeconds: number;
      }
    | undefined;
};

app.use(express.json());
app.use(cors());

const client = new MongoClient(
  "mongodb+srv://witooz123:zFzk5mcdIZtM3oqj@konekctdb.pboag0p.mongodb.net/",
);

await client.connect();

type AuthyRequest = Request<
  {},
  {},
  {
    accessToken: string;
    entitlementsToken?: string;
    puuid: string;
  }
>;

app.post("/storefront", async (req: AuthyRequest, res: Response) => {
  try {
    const storefront: any = await fetch(
      `https://pd.eu.a.pvp.net/store/v3/storefront/${req.body.puuid}`,
      {
        method: "POST",
        headers: {
          "X-Riot-ClientPlatform":
            "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
          "X-Riot-ClientVersion": "B312378013F36E38",
          "X-Riot-Entitlements-JWT": req.body.entitlementsToken,
          Authorization: `Bearer ${req.body.accessToken}`,
        } as Record<string, string>,
        body: JSON.stringify({}),
      }
    ).then((r) => r.json());

    const preSkinLevel1IDs: string[] =
      storefront!.SkinsPanelLayout.SingleItemOffers.map((o: string) =>
        o.toUpperCase()
      );

    const session = client.db("ValorantData").collection("SkinData");

    const results = await session
      .aggregate([
        {
          $match: {
            "weaponSkins.levels.id": { $in: preSkinLevel1IDs },
          },
        },
        {
          $project: {
            weaponId: 1,
            chromas: 1,
            weaponSkins: {
              $map: {
                input: "$weaponSkins",
                as: "skin",
                in: {
                  id: "$$skin.id",
                  levels: {
                    $filter: {
                      input: "$$skin.levels",
                      as: "level",
                      cond: { $in: ["$$level.id", preSkinLevel1IDs] },
                    },
                  },
                },
              },
            },
          },
        },
      ])
      .toArray();

    const skinsInfo = results
      .flatMap((doc) =>
        doc.weaponSkins.filter(
          (skin: any) => skin.levels && skin.levels.length > 0
        )
      )
      .map((skin: any, index: number) => { return {
        skinID: skin.id,
        price: Object.values(storefront!.SkinsPanelLayout.SingleItemStoreOffers[index].Cost)[0],
      }});

    res.json(skinsInfo);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || e });
  }
});

app.post("/entitlements", async (req: AuthyRequest, res: Response) => {
  console.log(req.body);
  await fetch("https://entitlements.auth.riotgames.com/api/token/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.body.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    })
    .catch((e) => res.status(500).json({ error: e.message || e }));
});

app.post("/userinfo", async (req: AuthyRequest, res: Response) => {
  console.log(req);
  await fetch("https://auth.riotgames.com/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.body.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    })
    .catch((e) => res.status(500).json({ error: e.message || e }));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Up!");
});