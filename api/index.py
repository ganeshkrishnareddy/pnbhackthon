import sys
import os

# Ensure the root directory (containing 'backend') is in the Python path
root_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, root_dir)

from backend.main import app
