from .code_processor import codebase_setup
from fabric.api import execute

def setup_config(app):
    result = execute(codebase_setup, app)
    resp = list(result.values())
    print(resp[0])
    return resp[0]