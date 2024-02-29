import sanic

from . import api

__all__ = ['blueprints']

blueprints = sanic.Blueprint.group(api.group)
