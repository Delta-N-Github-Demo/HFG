import geopandas as gpd

# Lees het GEOJSON-bestand
gdf = gpd.read_file('statistieken_buurt_prive_vs_publiek.geojson')

# Controleer de eerste paar rijen van de GeoDataFrame
print(gdf.head())

# Controleer de datatypes van de kolommen
print(gdf.dtypes)