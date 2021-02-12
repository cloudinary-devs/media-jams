export default {
  data: {
    allPost: [
      {
        _id: '35c9ea1c-de41-471c-a92e-516957e50570',
        title: 'Hello World ',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem.  Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.  Morbi in ipsum sit amet pede facilisis laoreet. ',
        author: {
          name: 'Jesse W. Tomchak',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
            },
          },
        },
        tags: [
          {
            title: 'Web Workers',
          },
          {
            title: 'API',
          },
        ],
        slug: {
          current: 'Hello-World',
        },
      },
      {
        _id: '447d8c2b-5e17-435a-b32f-7707dfa553c8',
        title: 'New Posting New Posting  New Posting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem.  Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. ',
        author: {
          name: 'Jesse W. Tomchak',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
            },
          },
        },
        tags: [
          {
            title: 'HTML(5) ',
          },
          {
            title: 'React',
          },
        ],
        slug: {
          current: 'New-Posting-New-Posting-New-Posting',
        },
      },
      {
        _id: '4c88106f-e7be-45fb-a707-6bfeffa111c1',
        title: 'Great Titles Just Come to Mind',
        description:
          "Since there is no back-end support for front-end needed, everything, including sensitive information such as authentication credentials, will be exposed to the HTTPS request for a specific API call, either on the request body or in the code itself. For example, using Cloudinary signed upload service for Node.js. The authentication for a signed (secured) upload is a secure protocol created based on user’s API key, API secret key, and cloud name. And you're not supposed to expose these on the client-side.",
        author: {
          name: 'Jesse W. Tomchak',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
            },
          },
        },
        tags: [
          {
            title: 'Serverless',
          },
          {
            title: 'Amplify (AWS)',
          },
          {
            title: 'React',
          },
          {
            title: 'Image',
          },
        ],
        slug: {
          current: 'Great-Titles-Just-Come-to-Mind',
        },
      },
      {
        _id: 'a7760b4a-a419-4014-a6c0-5cb961c1b9ad',
        title: 'Build  serverless upload with Cloudinary',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est quam, fermentum sed varius vitae, consectetur sed nunc. Integer sed libero pellentesque, finibus arcu eget, interdum odio. Morbi in pretium dui, ut vehicula orci. Donec bibendum vulputate est sit amet scelerisque. Vestibulum ac rutrum metus. Integer placerat odio massa, finibus. ',
        author: {
          name: 'Maya Shavin',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/db5e5c6606f4cd8d5d425eafd705ccc1a54e6358-150x150.png',
            },
          },
        },
        tags: [
          {
            title: 'NextJS',
          },
          {
            title: 'Serverless',
          },
        ],
        slug: {
          current: 'Code-Ghost',
        },
      },
      {
        _id: 'c01139f9-7ff9-4ace-ad68-082ceff3b910',
        title: 'New Demo Town',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem.  Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.  ',
        author: {
          name: 'Jesse W. Tomchak',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
            },
          },
        },
        tags: [
          {
            title: 'Amplify (AWS)',
          },
        ],
        slug: {
          current: 'New-Demo-Town',
        },
      },
      {
        _id: 'd19d5a2c-c154-466c-aad0-39dc334c4ee5',
        title: 'Here we go',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est quam, fermentum sed varius vitae, consectetur sed nunc. Integer sed libero pellentesque, finibus arcu eget, interdum odio. Morbi in pretium dui, ut vehicula orci. Donec bibendum vulputate est sit amet scelerisque. Vestibulum ac rutrum metus. Integer placerat odio massa, finibus. ',
        author: {
          name: 'Jesse W. Tomchak',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
            },
          },
        },
        tags: [
          {
            title: 'Amplify (AWS)',
          },
        ],
        slug: {
          current: 'Here-we-go',
        },
      },
      {
        _id: 'e0ec33e3-d419-4585-9198-30673a719801',
        title: 'Browser Compression',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est quam, fermentum sed varius vitae, consectetur sed nunc. Integer sed libero pellentesque, finibus arcu eget, interdum odio. Morbi in pretium dui, ut vehicula orci. Donec bibendum vulputate est sit amet scelerisque. Vestibulum ac rutrum metus. Integer placerat odio massa, finibus. ',
        author: {
          name: 'Becky Peltz',
          image: {
            asset: {
              url:
                'https://cdn.sanity.io/images/5ad74sb4/stage/c273884648f1359a4e044d35ed96b5c9b6964f3d-345x345.png',
            },
          },
        },
        tags: [
          {
            title: 'HTML(5) ',
          },
          {
            title: 'Compression',
          },
          {
            title: 'NuxtJS',
          },
        ],
        slug: {
          current: 'BS-Compression',
        },
      },
    ],
  },
};
