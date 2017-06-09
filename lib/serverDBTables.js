
const itemTable =
"CREATE TABLE IF NOT EXISTS item\
(\
  id serial PRIMARY KEY,\
  name varchar(30) NOT NULL,\
  description varchar(150),\
  creation_date timestamp without time zone NOT NULL,\
  owner_id integer REFERENCES account(id),\
  image_id integer REFERENCES image(id)\
);";

const imageTable =
"CREATE TABLE IF NOT EXISTS image\
(\
  id serial PRIMARY KEY,\
  url varchar(500) NOT NULL,\
  name varchar(30) NOT NULL \
);";

const itemListingTable =
"CREATE TABLE IF NOT EXISTS item_listing\
(\
  item_id integer UNIQUE REFERENCES item(id),\
  listing_id integer UNIQUE REFERENCES listing(id),\
  PRIMARY KEY (item_id, listing_id)\
);";

const listingTypeEnum = "CREATE TYPE listingType AS ENUM ('bid','buyout');";

const listingTable =
"CREATE TABLE IF NOT EXISTS listing\
(\
  id serial PRIMARY KEY,\
  type listingType NOT NULL,\
  starting_price numeric NOT NULL,\
  expiry_date timestamp without time zone NOT NULL,\
  creation_date timestamp without time zone NOT NULL,\
  seller_id integer NOT NULL REFERENCES account(id),\
  sold bool NOT NULL DEFAULT false\
);";

//const bidListingTable =
//"CREATE TABLE IF NOT EXISTS bid_listing\
//(\
//  bid_id integer REFERENCES bid(id),\
//  listing_id integer REFERENCES listing(id)\
//);";

const bidTable =
"CREATE TABLE IF NOT EXISTS bid\
(\
  id serial PRIMARY KEY,\
  amount numeric NOT NULL,\
  creation_date timestamp without time zone NOT NULL,\
  bidder_id integer NOT NULL REFERENCES account(id),\
  listing_id integer NOT NULL REFERENCES listing(id)\
);";

const tagTable =
"CREATE TABLE IF NOT EXISTS tag\
(\
  id serial PRIMARY KEY,\
  name varchar(16) NOT NULL\
);";

const tagValueTable =
"CREATE TABLE IF NOT EXISTS tag_value\
(\
  tag_id integer NOT NULL REFERENCES tag(id),\
  item_id integer NOT NULL REFERENCES item(id),\
  value varchar(100),\
  PRIMARY KEY(tag_id, item_id)\
);";

const accountTable =
"CREATE TABLE IF NOT EXISTS account\
(\
  id serial PRIMARY KEY,\
  username text UNIQUE NOT NULL,\
  password text NOT NULL,\
  email text NOT NULL,\
  money numeric DEFAULT 0.00,\
  details text \
);";

const messageTable =
   "CREATE TABLE IF NOT EXISTS message\
  (id serial PRIMARY KEY,\
  parent_id integer REFERENCES message(id),\
  content varchar(100),\
  title varchar(500), \
  read bool DEFAULT false, \
  time_created timestamp without time zone NOT NULL,\
  sender text REFERENCES message_route (sender),\
  recipient text REFERENCES message_route (recipient)\
  );";

const messageRouteTable =
  "CREATE TABLE IF NOT EXISTS message_route\
  (sender text UNIQUE REFERENCES account(username),\
  recipient text UNIQUE REFERENCES account(username),\
  PRIMARY KEY (sender, recipient)\
  );";

function getTableQueries(){
 return [
  //"DROP TABLE IF EXISTS tag_value;",
  //"DROP TABLE IF EXISTS item_listing;",
  //"DROP TABLE IF EXISTS item;",
   accountTable,
   messageRouteTable,
   messageTable,
   imageTable,
   itemTable,
   tagTable,
   tagValueTable,
   listingTypeEnum,
   listingTable,
   itemListingTable,
   bidTable
 ];
}

module.exports = {
  getTableQueries : getTableQueries
};
