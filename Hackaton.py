import geopandas as gpd
import matplotlib.pyplot as plt

# Lees het GEOJSON-bestand
gdf = gpd.read_file('./statistieken_buurt_prive_vs_publiek.geojson')

# Controleer of de gegevens correct zijn ingeladen
# print(gdf.head())  # Voeg deze regel toe om de eerste paar rijen te zien

# # Plot de gegevens
# gdf.plot(gdf)
# plt.show(gdf)
gdf.explore()