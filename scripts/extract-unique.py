#!/usr/bin/env python3
import csv
import pandas as pd

filePath = "/Users/oliverpan/Downloads/edfvzcx/data/overview.csv"
colums = ["Type", "Archetype", "Roles", "Trigger"]

# Read and display unique values for each column
df = pd.read_csv(filePath, sep=";")
for col in colums:
    print(df[col].unique())
